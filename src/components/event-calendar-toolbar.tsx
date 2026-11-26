import { CalendarController } from '@fullcalendar/react'
import { EventCalendarNextIcon, EventCalendarPrevIcon, EventCalendarNextYearIcon, EventCalendarPrevYearIcon } from '@/components/event-calendar-icons'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface EventCalendarToolbarProps {
  className?: string
  controller: CalendarController
  addButton?: {
    isPrimary?: boolean
    text?: string
    hint?: string
    click?: (ev: MouseEvent) => void
  }
  showTitle?: boolean
}

export function EventCalendarToolbar({
  className,
  controller,
  addButton,
  showTitle,
}: EventCalendarToolbarProps) {
  const buttons = controller.getButtonState()

  return (
    <div
      className={cn(
        'flex items-center justify-between flex-wrap gap-3',
        className,
      )}
    >
      {addButton && (
        <Button
          onClick={addButton.click as any}
          aria-label={addButton.hint}
        >{addButton.text}</Button>
      )}
      {showTitle && (
        <h2>
          {controller.view?.title}
        </h2>
      )}
      <div className='flex items-center shrink-0 gap-3'>
        <Button
          onClick={() => controller.today()}
          disabled={buttons.today.isDisabled}
          aria-label={buttons.today.hint}
          variant='outline'
        >
          {buttons.today.text}
        </Button>
        <div className='flex items-center gap-2'>
          <Button
            onClick={() => controller.prevYear()}
            disabled={buttons.prevYear.isDisabled}
            aria-label={buttons.prevYear.hint}
            variant='outline'
            size='icon'
          >
            <EventCalendarPrevYearIcon />
          </Button>
          <Button
            onClick={() => controller.prev()}
            disabled={buttons.prev.isDisabled}
            aria-label={buttons.prev.hint}
            variant='outline'
            size='icon'
          >
            <EventCalendarPrevIcon />
          </Button>
          <Button
            onClick={() => controller.next()}
            disabled={buttons.next.isDisabled}
            aria-label={buttons.next.hint}
            variant='outline'
            size='icon'
          >
            <EventCalendarNextIcon />
          </Button>
          <Button
            onClick={() => controller.nextYear()}
            disabled={buttons.nextYear.isDisabled}
            aria-label={buttons.nextYear.hint}
            variant='outline'
            size='icon'
          >
            <EventCalendarNextYearIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}
