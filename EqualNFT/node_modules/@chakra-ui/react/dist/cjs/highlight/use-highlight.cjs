'use client';
'use strict';

var react = require('react');
var highlightWords = require('./highlight-words.cjs');

function useHighlight(props) {
  const { text, query } = props;
  return react.useMemo(() => highlightWords.highlightWords({ text, query }), [text, query]);
}

exports.useHighlight = useHighlight;
