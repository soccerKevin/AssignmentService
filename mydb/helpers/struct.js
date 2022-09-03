class Struct {
  #props
  #validateProps
  #base
  #allowed
  constructor({ props, validateProps, base, allowed }) {
    this.#validateProps = validateProps
    this.#base = base
    this.#allowed = allowed

    const validatedProps = validateProps(props)
    this.#setProps({ ...base, ...validatedProps })
  }

  #setProps(props) {
    this.#allowed.forEach((field) => this[`#${field}`] = props[field])
  }

  getProps() {
    if (this.#props) return this.#props
    const acc = {}
    this.#allowed.forEach((field) => acc[field] = this[`#${field}`])
    return this.#props = acc
  }
}

export default Struct
