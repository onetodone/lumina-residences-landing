type FloorPlanProps = {
  className?: string
}

const rooms = [
  { x: 8, y: 8, w: 110, h: 66, label: 'Living / Dining' },
  { x: 8, y: 78, w: 70, h: 40, label: 'Kitchen' },
  { x: 82, y: 78, w: 36, h: 40, label: 'Study' },
  { x: 8, y: 122, w: 110, h: 30, label: 'Terrace' },
  { x: 122, y: 8, w: 62, h: 56, label: 'Primary Bedroom' },
  { x: 122, y: 68, w: 62, h: 26, label: 'Ensuite' },
  { x: 188, y: 8, w: 44, h: 44, label: 'Bedroom 2' },
  { x: 188, y: 56, w: 44, h: 38, label: 'Bedroom 3' },
  { x: 122, y: 98, w: 110, h: 54, label: 'Family Bath' },
]

/** Abstract line-art floor plan for the 3 Bedroom type (SPEC.md section 4C). Purely illustrative, not to exact scale. */
export function ThreeBedPlan({ className }: FloorPlanProps) {
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
          <text x={room.x + 4} y={room.y + 12} className="fill-muted-foreground text-[6.5px] tracking-wide uppercase">
            {room.label}
          </text>
        </g>
      ))}
    </svg>
  )
}
