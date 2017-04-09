import CollectionItems from './ui/CollectionItems'
import { connect } from 'react-redux'


const mapStateToProps = (state, props) => {
  const collectionId = props.match.params.collectionId

  let index = -1
  for (let i = 0; i < state.collections.length; i++) {
    if (state.collections[i].id === collectionId) {
      index = i
      break
    }
  }

  if (index < 0) {
    props.history.goBack()
    return {}
  }

  return {
    items: state.collections[index].items
  }
}

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(CollectionItems)
