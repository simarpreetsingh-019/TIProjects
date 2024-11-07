'use client';
'use strict';

var react = require('react');

function forwardRef(component) {
  return react.forwardRef(component);
}

exports.forwardRef = forwardRef;
