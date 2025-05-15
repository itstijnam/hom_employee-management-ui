import React, { useState } from 'react';
import '../style/AddCategory.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setCategories } from '../../../redux/employeeSlice';
import { useNavigate } from 'react-router-dom';

function AddCategory() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [dialogue, setDialogue] = useState(false);
    const [inputText, setInputText] = useState('')
    const {categories} = useSelector(store => store.employee);
    console.log(categories)
  const addHandler = () => {
    if (inputText.trim() === '') return;

    dispatch(setCategories([inputText.trim(), ...categories]));
    setInputText('');
    setDialogue(false);
  };

  return (
    <div className="add-category-container">
      <h2 className="title">Cetegory List</h2>
      <button className="add-button" onClick={()=>setDialogue(!dialogue)} >Add Category</button>
      <table className="category-table">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((cat, index) => (
            <tr key={index}>
              <td>{cat}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {dialogue && 
        <div className='addDialogue'>
             Add Category
            <div className="add_input">
                <input type="text" value={inputText} onChange={(e)=>setInputText(e.target.value)} />
            </div>
            <div className="add" onClick={addHandler}>Add</div>
        </div>
      }
    </div>
  );
}

export default AddCategory;
