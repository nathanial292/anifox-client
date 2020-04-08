import React, { Component } from 'react'
import InfiniteLoader from 'react-window-infinite-loader'
import { FixedSizeList } from 'react-window'
import { withStyles } from '@material-ui/core'
import AutoSizer from 'react-virtualized-auto-sizer'

import Title from './Title'

const styles = theme => ({
  image: {
    height: '242px',
    width: '167px',
    transition: 'all .2s linear',
  },
})

class AnimeWrapper extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { hasNextPage, isNextPageLoading, items, loadNextPage } = this.props
        
          // If there are more items to be loaded then add an extra row to hold a loading indicator.
        const itemCount = hasNextPage ? items.length + 1 : items.length;

        // Only load 1 page of items at a time.
        // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
        const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;

        // Every row is loaded except for our loading indicator row.
        const isItemLoaded = index => !hasNextPage || index < items.length;

          // Render an item or a loading indicator.
        const Item = ({ index, style }) => {
            let content;
            if (!isItemLoaded(index)) {
            content = <div>Loading....</div>
            } else {
            content = items[index].map(value => (
              <Title value={value} handleClick={this.props.handleClick} />
            ));
            }

            return content
        };

        return (
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={itemCount}
            loadMoreItems={loadMoreItems}
          >
          {({ onItemsRendered, ref }) => (
            <AutoSizer>
            {({ height, width }) => (
              <FixedSizeList
                className="List"
                height={height}
                itemCount={itemCount}
                itemSize={1}
                onItemsRendered={onItemsRendered}
                ref={ref}
                width={width}
              >
                {Item}
              </FixedSizeList>
              )}
            </AutoSizer>
          )}
        </InfiniteLoader>
        )
    }
}

export default withStyles(styles)(AnimeWrapper)