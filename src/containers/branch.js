import React from 'react';
import { connect } from 'react-redux';
import Leaf from '../components/leaf';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps() {
  return {};
}

function BranchContainer() {
  return (
    <Leaf />
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BranchContainer);
