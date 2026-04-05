import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit';
import './mu-tabs';
import './mu-tab';
import './mu-tab-panel';

const meta: Meta = {
  title: 'Navigation/Tabs',
  component: 'mu-tabs',
  argTypes: {
    selectedIndex: {control: {type: 'number', min: 0}},
  },
};
export default meta;

export const Default: StoryObj = {
  args: {selectedIndex: 0},
  render: (args) => html`
    <mu-tabs selectedIndex="${args.selectedIndex}">
      <mu-tab slot="tab">Tab 1</mu-tab>
      <mu-tab slot="tab">Tab 2</mu-tab>
      <mu-tab slot="tab">Tab 3</mu-tab>
      <mu-tab-panel slot="panel">Content for Tab 1</mu-tab-panel>
      <mu-tab-panel slot="panel">Content for Tab 2</mu-tab-panel>
      <mu-tab-panel slot="panel">Content for Tab 3</mu-tab-panel>
    </mu-tabs>
  `,
};

export const WithDisabledTab: StoryObj = {
  render: () => html`
    <mu-tabs>
      <mu-tab slot="tab">Enabled</mu-tab>
      <mu-tab
        slot="tab"
        disabled
      >
        Disabled
      </mu-tab>
      <mu-tab slot="tab">Also Enabled</mu-tab>
      <mu-tab-panel slot="panel">Panel 1</mu-tab-panel>
      <mu-tab-panel slot="panel">Panel 2 (disabled tab)</mu-tab-panel>
      <mu-tab-panel slot="panel">Panel 3</mu-tab-panel>
    </mu-tabs>
  `,
};
