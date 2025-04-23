import { cn } from '@/lib/shadcn';
import React, { HTMLAttributes, ReactNode, useRef, useState, useEffect, useCallback } from 'react';

const TRACK_PADDING = 8;
const MIN_SCROLLBAR_HEIGHT = 30;
const SCROLLBAR_HIDE_DELAY = 700;

type ScrollbarContainerProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  children: ReactNode;
  contentClassName?: string;
};

const ScrollbarContainer = ({ children, className, contentClassName, ...props }: ScrollbarContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timerId = useRef<number | NodeJS.Timeout | null>(null);

  const [scrollbarHeight, setScrollbarHeight] = useState<number>(MIN_SCROLLBAR_HEIGHT);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startMouseY, setStartMouseY] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  const calculateScrollbarMetrics = useCallback(() => {
    if (!containerRef.current || !contentRef.current) return;

    const containerHeight = containerRef.current.clientHeight;
    const contentHeight = contentRef.current.scrollHeight;

    if (contentHeight > containerHeight) {
      setIsVisible(true);
      const ratio = containerHeight / contentHeight;
      const height = Math.max(MIN_SCROLLBAR_HEIGHT, Math.min(containerHeight, ratio * containerHeight));
      setScrollbarHeight(height);
      updateScrollPosition();
    } else {
      setIsVisible(false);
    }
  }, []);

  const updateScrollPosition = useCallback(() => {
    if (!contentRef.current || !containerRef.current) return;

    const contentHeight = contentRef.current.scrollHeight;
    const containerHeight = containerRef.current.clientHeight;
    const scrollTop = contentRef.current.scrollTop;

    const maxScrollTop = contentHeight - containerHeight;
    if (maxScrollTop <= 0) return;

    const scrollRatio = scrollTop / maxScrollTop;
    const availableTrackHeight = containerHeight - scrollbarHeight - TRACK_PADDING;
    const newScrollPosition = scrollRatio * availableTrackHeight + TRACK_PADDING / 2;

    setScrollPosition(newScrollPosition);
  }, [scrollbarHeight]);

  const handleScroll = useCallback(() => {
    if (timerId.current) clearTimeout(timerId.current);
    setIsScrolling(true);
    updateScrollPosition();

    timerId.current = setTimeout(() => {
      setIsScrolling(false);
    }, SCROLLBAR_HIDE_DELAY);
  }, [updateScrollPosition]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(true);
      setStartMouseY(e.clientY - scrollPosition);
    },
    [scrollPosition]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging || !containerRef.current || !contentRef.current) return;

      const containerHeight = containerRef.current.clientHeight;
      const availableTrackHeight = containerHeight - scrollbarHeight - TRACK_PADDING;

      const y = e.clientY - startMouseY;
      const minY = TRACK_PADDING / 2;
      const maxY = minY + availableTrackHeight;
      const newPosition = Math.max(minY, Math.min(y, maxY));

      setScrollPosition(newPosition);

      const adjustedPosition = newPosition - TRACK_PADDING / 2;
      const scrollRatio = adjustedPosition / availableTrackHeight;

      const contentHeight = contentRef.current.scrollHeight;
      const visibleHeight = contentRef.current.clientHeight;
      const maxScrollTop = contentHeight - visibleHeight;
      contentRef.current.scrollTop = scrollRatio * maxScrollTop;
    },
    [isDragging, scrollbarHeight, startMouseY]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    calculateScrollbarMetrics();

    const resizeObserver = new ResizeObserver(() => {
      calculateScrollbarMetrics();
    });

    if (contentRef.current) resizeObserver.observe(contentRef.current);
    if (containerRef.current) resizeObserver.observe(containerRef.current);

    return () => {
      if (contentRef.current) resizeObserver.unobserve(contentRef.current);
      if (containerRef.current) resizeObserver.unobserve(containerRef.current);
      resizeObserver.disconnect();
      if (timerId.current) clearTimeout(timerId.current);
    };
  }, [calculateScrollbarMetrics]);

  return (
    <div
      ref={containerRef}
      className={cn('relative', className)}
      {...props}
      onMouseMove={isDragging ? handleMouseMove : undefined}
      onMouseUp={isDragging ? handleMouseUp : undefined}
      onMouseLeave={isDragging ? handleMouseUp : undefined}
    >
      <div
        ref={contentRef}
        className={cn('scrollbar-hidden h-full overflow-auto', contentClassName)}
        onScroll={handleScroll}
      >
        {children}
      </div>

      {isVisible && (
        <div className="absolute right-0 top-0 flex h-full w-4 justify-center bg-transparent py-1">
          <div
            className={cn(
              'absolute w-1.5 cursor-pointer rounded-[0.1875rem] transition-colors hover:bg-gray-300',
              isScrolling ? 'bg-gray-300' : 'bg-transparent'
            )}
            style={{
              height: `${scrollbarHeight}px`,
              top: `${scrollPosition}px`
            }}
            onMouseDown={handleMouseDown}
          />
        </div>
      )}
    </div>
  );
};

export default ScrollbarContainer;
