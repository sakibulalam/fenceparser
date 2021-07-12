export const mapToObject = (map: Map<string, unknown> | null) => {
  if (map === null) return map

  return Array.from(map.entries()).reduce(
    (obj: Record<string, unknown>, [key, value]) => {
      obj[key] = value
      return obj
    },
    {}
  )
}

// Apparently from StackOverflow
const permute = (input: Array<string>) => {
  let length = input.length,
    result = [input.slice()],
    c = new Array(length).fill(0),
    i = 1,
    k,
    p

  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i]
      p = input[i]
      input[i] = input[k]
      input[k] = p
      ++c[i]
      i = 1
      result.push(input.slice())
    } else {
      c[i] = 0
      ++i
    }
  }

  return result
}

export const prepareCases = (
  cases: Array<{
    input: Array<string>
    output?: Record<string, unknown> | null
    error?: string
  }>
) => {
  return cases
    .map(({ input, ...props }) => {
      return permute(input).map(p => ({ input: p.join(' '), ...props }))
    })
    .reduce((a, b) => [...a, ...b])
}