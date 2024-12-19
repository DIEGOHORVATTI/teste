export const convertObjectToQuery = (filter: Record<string, any>, parentKey: string = ''): Record<string, any> => {
  const query: Record<string, any> = {}

  for (const key in filter) {
    if (filter.hasOwnProperty(key)) {
      processKey(key, filter[key], query, parentKey)
    }
  }

  return query
}

function processKey(key: string, value: any, query: Record<string, any>, parentKey: string) {
  if (key === 'startDate' || key === 'endDate') {
    handleDateFilters(key, value, query)

    return
  }

  const isNestedObject = isStructuredObject(value)
  const newKey = parentKey ? `${parentKey}.${key}` : key

  if (isNestedObject) {
    Object.assign(query, convertObjectToQuery(value, newKey))
  }

  if (!isNestedObject) {
    query[newKey] = value
  }
}

function handleDateFilters(key: string, value: any, query: Record<string, any>) {
  const dateKey = 'createdAt'
  const startDate = key === 'startDate' ? new Date(value) : null
  const endDate = key === 'endDate' ? new Date(value) : null

  if (startDate) {
    query[dateKey] = { ...query[dateKey], $gte: startDate }
  }

  if (endDate) {
    query[dateKey] = { ...query[dateKey], $lte: endDate }
  }
}

function isStructuredObject(value: any): boolean {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
