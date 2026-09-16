type FloorPlanProps = {
  className?: string
}

const rooms = [
  { x: 8, y: 8, w: 140, h: 90, label: 'Living / Dining' },
  { x: 8, y: 106, w: 66, h: 46, label: 'Kitchen' },
  { x: 82, y: 106, w: 66, h: 46, label: 'Entry' },
  { x: 156, y: 8, w: 76, h: 84, label: 'Bedroom' },
  { x: 156, y: 100, w: 76, h: 52, label: 'Bath' },
]

/** Abstract line-art floor plan for the 1 Bedroom type (SPEC.md section 4C). Purely illustrative, not to exact scale. */
export function OneBedPlan({ className }: FloorPlanProps) {
  return (
    <svg viewBox="0 0 240 160" aria-hidden className={className}>
      <rect x="4" y="4" width="232" height="152" fill="none" className="stroke-border" strokeWidth="1.5" />
      {rooms.map((room) => (
        <g key={room.label}>
          <rect
            x={room.x}
            y={room.y}
            width={room.w}
            height={room.h}
            fill="none"
            className="stroke-gold/40"
            strokeWidth="1.25"
          />
          <text x={room.x + 6} y={room.y + 14} className="fill-muted-foreground text-[8px] tracking-wide uppercase">
            {room.label}
          </text>
        </g>
      ))}
    </svg>
  )
}
