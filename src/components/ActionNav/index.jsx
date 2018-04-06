import React, { Component } from 'react';
import { Button, Divider } from 'antd';
import './index.css';

export default function ActionNav({ onClickCreate = () => {}, onBack = () => {}, showBackBtn }) {
  return (
    <div className="action-navigator">
      <div className="action-navigator-controller">
        <Button
          type="primary"
          icon={showBackBtn ? 'left' : 'plus-square-o'}
          onClick={showBackBtn ? onBack : onClickCreate}
          className="action-navigator-button-create"
        >
          {showBackBtn ? 'Back' : 'Create'}
        </Button>
      </div>
      <Divider />
    </div>
  );
}
