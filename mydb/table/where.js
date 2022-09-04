const COMPARISONS = {
  '=':   'equals',
  '=[]': 'equalsAny',
  '>':   'isGreaterThan',
  '<':   'isLessThan',
}

const COMPARISON_VALUES = Object.keys(COMPARISONS)

const validateComparison = (comparison) => {
  if (!COMPARISON_VALUES.includes(comparison))
    throw new Error('Comparison must be one of', COMPARISON_VALUES.join(', '))
}

class Where {
  constructor({ field, comparison, value }) {
    validateComparison(comparison)
    this.field = field
    this.comparison = COMPARISONS[comparison]
    this.value = value
  }

  equals(record, check) {
    // typecast to strings for consistent checking
    return record.toString() === check.toString()
  }

  equalsAny(record, checks) {
    return checks.includes(record)
  }

  isGreaterThan(record, check) {
    return record > check
  }

  isLessThan(record, check) {
    return record < check
  }

  compare(record) {
    return this[this.comparison](record, this.value)
  }
}

export default Where
