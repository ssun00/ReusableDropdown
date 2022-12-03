import React, { useState, useRef, useEffect } from 'react';
import "./Dropdown.css";
import DownArrow from './down-arrow.svg';
import Remove from './remove.svg';
import Checked from './checked.svg';
import Unchecked from './unchecked.svg'

export default function Dropdown( { title, items, multiSelect } ) {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState(multiSelect ? [] : null);
  const [checked, setChecked] = useState(new Map());
  const ref = useRef();

  // closes dropdown when clicking outside
  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
    }
  };
  useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside, true);
      return () => {
          document.removeEventListener('mousedown', handleClickOutside, true);
      };
  }, []);

  // component for displaying a checked box
  function CheckTheBox({ item, source, alt, id, key, label, onClick }) {
    return (
      <div onClick={onClick}>
        <img src={source} 
            alt={alt}
            id={id}
            key={key}
            label={label} 
        /> 
        {item}
      </div>
    )
  }

  // component for displaying an unchecked box
  function UncheckTheBox({ item, source, alt, id, key, label, onClick }) {
    return (
      <div onClick={onClick}>
        <img src={source} 
            alt={alt}
            id={id}
            key={key}
            label={label} 
        /> 
        {item}
      </div>
    )
  }

  // manages state of opening and closing the list of items
  function handleOpen() {
    setOpen(!open);
  }

  // adds selected item to selection arr
  function addToLabel(e, item) {
    if (multiSelect) {
      if (!selection.includes(item)) {
        selection.push(item);
        setSelection(selection);
      } else {
        let index = selection.indexOf(item);
        selection.splice(index, 1);
        setSelection(selection);
      }
      console.log(selection)
    } else {
      setSelection(item);
      handleOpen();
    }
  }

  // allows for each checkmark to be checked/unchecked individually
  function handleCheck(e, item) {
    console.log(item)
    let newMap;
    if (!checked.has(item) || !checked.get(item)){
      newMap = new Map(checked.set(item, true))
      setChecked(newMap);
    } else {
      newMap = new Map(checked.set(item, false))
      setChecked(newMap);
    }
    console.log(checked)
    addToLabel(e, item) 
  }

  // removes item from label in multiple dropdown
  function removeItem(item) {
    let index = selection.indexOf(item);
    selection.splice(index, 1);
    setChecked(checked.set(item, false));
    setSelection(selection);
  }

  // render the label section of the dropdown
  function getLabel() {
    // if none of the items are selected, just have the title as the label
    if (!selection || selection.length === 0 ) {
      return title;
    }

    // return the selected item with a remove option
    if (multiSelect) {
      return (
        <div className='dd-tags'>
          {selection.map((item) => (
            <div key={item} className='dd-tag-item'>
              {item}
              <span
                onClick={() => removeItem(item)}
                className='dd-tag-close'
              >
                <img src={Remove} alt='Remove Item' id='remove' />
              </span>
            </div>
          ))}
        </div>
      )
    }

    // for single dropdown, just return what is selected
    return selection;
  }

  
  // render multiple dropdown
  if (multiSelect) {
    return (
      <div className='dd-container' ref={ref}>
        <div className='dd-label' onClick={handleOpen}>
          <div className='dd-selected-value'>{getLabel()}</div>
          <div>
            <div>
              <img src={DownArrow} alt='Down Arrow' id='arrow'/>
            </div>
          </div>
        </div>
        {open && (
          <div className='dd-list'>
            {items.map((item) => (
              <div className='dd-item'>
                { checked.has(item.value) && checked.get(item.value) ?
                  <CheckTheBox
                    source={Checked} 
                    alt="Checked Checkbox" 
                    id='checkbox' 
                    onClick={(e) => handleCheck(e, item.value)}
                    key={item.label}
                    label={item.value} 
                    item={item.value}
                   />
                  : <UncheckTheBox 
                    source={Unchecked} 
                    alt="Unchecked Checkbox" 
                    id='checkbox' 
                    onClick={(e) => handleCheck(e, item.value)}
                    key={item.label}
                    label={item.value} 
                    item={item.value}
                  />
                }
              </div>
            ))}
          </div>
        )} 
      </div>
    )
  } else {
    return (
      <div className='dd-container' ref={ref}>
        <div className='dd-label' onClick={handleOpen}>
          <div className='dd-selected-value'>{getLabel()}</div>
          <div>
            <div>
              <img src={DownArrow} alt='Down Arrow' id='arrow'/>
            </div>
          </div>
        </div>
        {open && (
          <div className='dd-list'>
            {items.map((item) => (
              <div 
                onClick={(e) => addToLabel(e, item.value)}
                key={item.label}
                label={item.value} 
                className='dd-item'
              >
                {item.value}
              </div>
            ))}
          </div> 
        )} 
      </div>
    )
  }
} 