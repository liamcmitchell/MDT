import nodeFromValue from './node-from-value'

const sourceUrl = ['file', 'test', 'domains.json']

export default {
  key: 'domains',
  item: 'domains',
  nodes: ({source, path}) =>
    source({
      method: 'OBSERVE',
      url: sourceUrl
    })
    .map(contents => {
      return nodeFromValue({
        value: JSON.parse(contents),
        path: path,
        onChange: (newValue) => {
          return source({
            method: 'SET',
            url: sourceUrl,
            value: JSON.stringify(newValue, null, 2)
          })
        }
      }).nodes
    })
}
