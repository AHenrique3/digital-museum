import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import CollectionItems from './container/CollectionItems'
import AppShell from './AppShell'
import strings from '../strings'
import { getCollection, getCollectionItems } from '../api'
import { setCollectionItems, updateCollection, addError, setLoadingCollection } from '../actions'


const mapStateToProps = (state, props) => {
	const collectionId = props.match.params.collectionId
	const collection = state.collections[collectionId]
	const missingCollection = !collection
	const loading = state.loading.collections[collectionId]

	return {
		collectionId,
		missingCollection,
		title: missingCollection ? strings.toolbar.loadingTitle : collection.name,
		items: missingCollection ? null : Object.keys(collection.items || {}).map(key => collection.items[key]),
		loading: typeof loading === 'boolean' ? loading : true,
	}
}

const mapDispatchToProps = dispatch => ({
	onError: (message, error) => dispatch(addError(message, error)),
	onLoad: collectionId => dispatch(setLoadingCollection(collectionId, true)),
	onCollectionItems: (collectionId, items) => {
		dispatch(setCollectionItems(collectionId, items))
		dispatch(setLoadingCollection(collectionId, false))
	},
	onCollection: collection => dispatch(updateCollection(collection)),
})


class CollectionItemsScreen extends React.Component {
	constructor(props) {
		super(props)
		this.collectionItemsSubscription = null
		this.state = {
			invalidCollection: false,
		}
	}

	componentWillMount() {
		const { collectionId, items, onLoad, missingCollection } = this.props
		if (!items) onLoad(collectionId)

		if (missingCollection) {
			getCollection(collectionId).take(1).toPromise()
					.then(collection => this.props.onCollection(collection))
					.catch(error => {
						this.props.onError(strings.error.generic.collectionLoad, error)
						this.setState({ invalidCollection: true })
					})
		}

		this.collectionItemsSubscription = getCollectionItems(collectionId)
				.subscribe(collections => this.props.onCollectionItems(collectionId, collections), error => {
					this.props.onError(strings.error.generic.collectionLoad, error)
					this.setState({ invalidCollection: true })
				})
	}

	componentWillUnmount() {
		if (this.collectionItemsSubscription) {
			this.collectionItemsSubscription.unsubscribe()
			this.collectionItemsSubscription = null
		}
	}

	render() {
		const { title, loading } = this.props
		const { invalidCollection } = this.state

		if (invalidCollection) {
			return <Redirect to='/'/>
		}

		return (
				<AppShell title={ title } loading={ loading }>
					<CollectionItems/>
				</AppShell>
		)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(CollectionItemsScreen)
