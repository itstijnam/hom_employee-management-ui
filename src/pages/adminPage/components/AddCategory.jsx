import React, { useState } from 'react';
import { FiPlus, FiX, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { setCategories } from '../../../redux/employeeSlice';
import '../style/AddCategory.scss';

function AddCategory() {
  const dispatch = useDispatch();
  const [showDialog, setShowDialog] = useState(false);
  const [inputText, setInputText] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const { categories } = useSelector(store => store.employee);

  const addHandler = () => {
    if (inputText.trim() === '') return;

    if (editingIndex !== null) {
      // Update existing category
      const updatedCategories = [...categories];
      updatedCategories[editingIndex] = inputText.trim();
      dispatch(setCategories(updatedCategories));
    } else {
      // Add new category
      dispatch(setCategories([inputText.trim(), ...categories]));
    }

    setInputText('');
    setEditingIndex(null);
    setShowDialog(false);
  };

  const editHandler = (index) => {
    setInputText(categories[index]);
    setEditingIndex(index);
    setShowDialog(true);
  };

  const deleteHandler = (index) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      const updatedCategories = categories.filter((cat, i) => i !== index);
      dispatch(setCategories(updatedCategories));
    }
  };

  return (
    <div className="add-category-container">
      <h2 className="title">Category Management</h2>
      
      <div className="header-section">
        <button 
          className="add-button"
          onClick={() => {
            setInputText('');
            setEditingIndex(null);
            setShowDialog(true);
          }}
        >
          <FiPlus /> Add Category
        </button>
      </div>

      {categories.length > 0 ? (
        <div className="category-table-container">
          <table className="category-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, index) => (
                <tr key={index}>
                  <td>{cat}</td>
                  <td>
                    <div className="category-actions">
                      <button 
                        className="action-btn edit-btn"
                        onClick={() => editHandler(index)}
                        aria-label="Edit category"
                      >
                        <FiEdit2 />
                      </button>
                      <button 
                        className="action-btn delete-btn"
                        onClick={() => deleteHandler(index)}
                        aria-label="Delete category"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state">
          <p>No categories found. Add your first category to get started.</p>
          <button 
            className="empty-btn"
            onClick={() => setShowDialog(true)}
          >
            <FiPlus /> Add Category
          </button>
        </div>
      )}

      {showDialog && (
        <>
          <div className="backdrop" onClick={() => setShowDialog(false)} />
          <div className="add-dialog">
            <div className="dialog-header">
              <h3>{editingIndex !== null ? 'Edit Category' : 'Add New Category'}</h3>
              <button 
                className="close-btn"
                onClick={() => setShowDialog(false)}
                aria-label="Close dialog"
              >
                <FiX />
              </button>
            </div>
            
            <div className="add-input">
              <input 
                type="text" 
                value={inputText} 
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter category name"
                autoFocus
              />
            </div>
            
            <div className="dialog-actions">
              <button 
                className="cancel-btn"
                onClick={() => setShowDialog(false)}
              >
                Cancel
              </button>
              <button 
                className="confirm-btn"
                onClick={addHandler}
                disabled={inputText.trim() === ''}
              >
                {editingIndex !== null ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AddCategory;