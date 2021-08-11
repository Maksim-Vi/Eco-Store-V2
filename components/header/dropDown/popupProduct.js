import React, { useRef, useEffect } from 'react'
import s from '../../../styles/header/dropDownPopup.module.css'
import classname from 'classnames'
import stl from '../../../styles/header/nav.module.scss'
import ListItems from './list';
import ListProductsTop from './listProductTop';

function useOuterClick(callback) {
  const innerRef = useRef();
  const callbackRef = useRef();

  // set current callback in ref, before second useEffect uses it
  useEffect(() => { // useEffect wrapper to be safe for concurrent mode
    callbackRef.current = callback;
  });

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);

    // read most recent callback and innerRef dom node from refs
    function handleClick(e) {
      if (
        innerRef.current &&
        callbackRef.current &&
        !innerRef.current.contains(e.target)
      ) {
        callbackRef.current(e);
      }
    }
  }, []); // no need for callback + innerRef dep

  return innerRef; // return ref; client can omit `useRef`
}

const PopupProduct = (props) => {

  let [open, SetOpen] = React.useState(false)
  const toggle = () => SetOpen(!open)

  const innerRef = useOuterClick(e => {
    SetOpen(false)
  });

  const clickSetItemType = (type) => {
    setItemDropdownMenu(type)
  }

  return (
    <div className={s.Wrapper} ref={innerRef}>
      <div onClick={() => { toggle(!open) }}>
        <a className={classname(stl.link, {
          [`${stl.linkActive}`]: open === true
        })} onClick={() => { toggle() }}>ПРОДУКЦИЯ</a>
      </div>
      <ListItems itemsTab={props.itemsTab} open={open} toggle={toggle}/>
      {/* <ListProductsTop open={open}/> */}
    </div>)
}

export default PopupProduct

