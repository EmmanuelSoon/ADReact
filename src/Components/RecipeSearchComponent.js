import React, {useState,useRef} from 'react'

export default function RecipeSearchComponent(props) {
    const {searchContent, setSearchContent, handleSearch, calories, setCalories} = props
    const filterRef = useRef()
    const applyFilter = (e) => {
        filterRef.current.style.display='none'
        handleSearch()
    }
    return (
        <div className='row mb-3'>
            <div className=' col-12 col-md-8 mt-2'>
                <input type='text' value={searchContent} placeholder='Search recipes...' className='form-control'
                        onChange={e => setSearchContent(e.target.value)} style={{width:'100%'}}/>
            </div>
            <div className='col-6 col-md-2 mt-2'>
                <button type="button" className="btn btn-primary" style={{width:'100%'}} onClick={handleSearch}>
                    <i className="fa fa-search"></i><span> Search</span>
                </button>
            </div>
            <div className='col-6 col-md-2 mt-2'>
                <button className='btn btn-primary' style={{width:'100%'}} onClick={() => filterRef.current.style.display='flex'}>
                <i className="fa fa-filter"></i><span> Max. Calories</span>
                </button>
            </div>
            <div style={{display:'none'}} ref={filterRef} className='row mt-2'>   
                <div className='col-12 col-md-9' >
                    <label className="form-label">Set Maximum Calories: {calories}</label>
                    <input type="range" className="form-range" min={0} max={1500} value={calories}
                            onChange ={(e) => setCalories(e.target.value)}/>
                </div>
                <div className='col-12 col-md-3 float-end'>
                    <button type="button" className="btn btn-primary mt-4" style={{width:'100%'}} onClick={applyFilter}>
                        Apply Filter
                    </button>
                </div> 
            </div>
            
        </div>
    )
}
