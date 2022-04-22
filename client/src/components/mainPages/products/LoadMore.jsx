import React, { useContext } from 'react';
import { GlobalState } from '../../../globleState';
import './products.css'

const LoadMore = () => {
    const state = useContext(GlobalState)
    const [page , setPage] = state.productsApi.page
    const [result] = state.productsApi.result
  return (
    <div className='load_more'>
       {
            result < page * 8 ? '' : <span className='loadMore-span' onClick={()=> setPage(page+1)}>Load More</span>
       }
    </div>
  );
}

export default LoadMore;
