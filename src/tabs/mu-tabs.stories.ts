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

/** Vertical orientation places the tab list to the left of the panels. */
export const Vertical: StoryObj = {
  render: () => html`
    <mu-tabs orientation="vertical">
      <mu-tab slot="tab">Profile</mu-tab>
      <mu-tab slot="tab">Security</mu-tab>
      <mu-tab slot="tab">Notifications</mu-tab>
      <mu-tab-panel slot="panel">Profile content</mu-tab-panel>
      <mu-tab-panel slot="panel">Security settings</mu-tab-panel>
      <mu-tab-panel slot="panel">Notification preferences</mu-tab-panel>
    </mu-tabs>
  `,
};

/** Scrollable tab list shows scroll-indicator chevron buttons when overflowing. */
export const Scrollable: StoryObj = {
  render: () => html`
    <div style="max-width:320px">
      <mu-tabs scrollable>
        <mu-tab slot="tab">Overview</mu-tab>
        <mu-tab slot="tab">Analytics</mu-tab>
        <mu-tab slot="tab">Reports</mu-tab>
        <mu-tab slot="tab">Integrations</mu-tab>
        <mu-tab slot="tab">Settings</mu-tab>
        <mu-tab-panel slot="panel">Overview panel</mu-tab-panel>
        <mu-tab-panel slot="panel">Analytics panel</mu-tab-panel>
        <mu-tab-panel slot="panel">Reports panel</mu-tab-panel>
        <mu-tab-panel slot="panel">Integrations panel</mu-tab-panel>
        <mu-tab-panel slot="panel">Settings panel</mu-tab-panel>
      </mu-tabs>
    </div>
  `,
};
