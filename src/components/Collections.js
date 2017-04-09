import Collections from './ui/Collections'
import { connect } from 'react-redux'


const mapStateToProps = (state, props) => ({
  collections: state.collections,
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Collections)
