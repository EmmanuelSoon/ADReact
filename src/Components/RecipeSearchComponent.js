import React, {useState} from 'react'

export default function RecipeSearchComponent(props) {
    const {searchContent, setSearchContent, handleSearch} = props
    return (
        <div className='row mb-3'>
            <div className='col-9'>
                <input type='text' value={searchContent} placeholder='Search recipes' className='form-control'
                        onChange={e => setSearchContent(e.target.value)} style={{width:'100%'}}/>
            </div>
            <div className='col-3 col-md-2'>
                <button type="button" className="btn btn-primary" style={{width:'100%'}} onClick={handleSearch}>
                    <i className="fa fa-search"></i>
                </button>
            </div>
        </div>
    )
}
