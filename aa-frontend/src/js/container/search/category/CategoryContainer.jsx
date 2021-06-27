import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CategoryWrapView from './CategoryWrapView';
import CategoryView from './CategoryView';
import MCategoryWrapView from './MCategoryWrapView';
import { handleCategoryList } from '../../../redux/actions/index';

import size from '../../../StyledVariable';

// Category를 만들어서 반환하는 Container
const CategoryContainer = ({ handleCategoryList, categories }) => {
  const [categoryList, setCategoryList] = useState(() => categories.map(category => category.seq));

  // to handle redux category list state
  useEffect(() => {
    handleCategoryList(categoryList);
  }, [categoryList]);

  // event for click category
  const onClickCategory = e => {
    const categoryObj = e.currentTarget;
    changeCategoryBackground(categoryObj);
  };

  // change category background
  const changeCategoryBackground = component => {
    const isSelected = component.getAttribute('data-isselected');
    // isSelected === 'true' means its already selected
    if (isSelected === 'true') {
      component.removeAttribute('data-isselected');
      categoryManager(component, 'remove');
    } else {
      component.setAttribute('data-isselected', 'true');
      categoryManager(component, 'add');
    }
  };

  // change category list state to handle redux category list state
  const categoryManager = (component, action) => {
    const categorySeq = parseInt(component.getAttribute('value'));
    if (action === 'add') {
      setCategoryList(prevState => {
        return [...prevState, categorySeq];
      });
    } else {
      setCategoryList(prevState => {
        const list = [...prevState];
        return list.filter(item => item !== categorySeq);
      });
    }
  };

  // make category DOM list
  const categoryDomList = useMemo(() => {
    return categories.map((category, idx) => {
      return <CategoryView key={idx} category={category} idxValue={idx} onClickCategory={onClickCategory} />;
    });
  }, [categories]);

  if (window.matchMedia(`(max-width: ${size.mobileL})`).matches) {
    return <MCategoryWrapView categories={categories} onClickCategory={onClickCategory} />;
  } else {
    return <CategoryWrapView categoryData={categories} categoryDomList={categoryDomList} />;
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      handleCategoryList
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(CategoryContainer);
