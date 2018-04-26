import React from 'react';
import { Button, Divider, Icon } from 'antd';
import './index.css';

const ButtonGroup = Button.Group;
export default function ActionNav({
  onSubmitCreate = () => {},
  onClickCreate = () => {},
  onBack = () => {},
  showBackBtn,
}) {
  return (
    <div className="action-navigator">
      <div className="action-navigator-controller">
        {showBackBtn ? (
          <ButtonGroup style={{ paddingLeft: '20px' }}>
            <Button type="primary" icon="left" onClick={onBack}>
              Back
            </Button>
            <Button type="primary" onClick={onSubmitCreate}>
              Create
              <Icon type="plus-square-o" />
            </Button>
          </ButtonGroup>
        ) : (
          <Button
            type="primary"
            icon="plus-square-o"
            onClick={onClickCreate}
            className="action-navigator-button-create"
          >
            {showBackBtn ? 'Back' : 'Create'}
          </Button>
        )}
      </div>
      <Divider />
    </div>
  );
}
