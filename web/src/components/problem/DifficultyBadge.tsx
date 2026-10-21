import { DIFFICULTY_STYLES } from '../../lib/utils'
import type { Difficulty } from '../../lib/types'
import { Badge } from '../common/Badge'

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <Badge tone="neutral" className={DIFFICULTY_STYLES[difficulty]}>
      {difficulty}
    </Badge>
  )
}
