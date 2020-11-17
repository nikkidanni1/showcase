import * as React from "react";
import { Admin, Resource } from 'react-admin';
// import jsonServerProvider from 'ra-data-json-server';
import fakeDataProvider from "ra-data-fakerest";

import { PostList } from './posts';

const dataProvider = fakeDataProvider({
  posts: [
    { title: "First Product", image: '/placeholder.png', price: 100, count: 10, selectedCount: 0 },
    { title: "Second Product", image: '/placeholder.png', price: 200, count: 20, selectedCount: 0 },
    { title: "Third Product", image: '/placeholder.png', price: 300, count: 30, selectedCount: 0 },

  ]
})

const App = () => (
  <Admin dataProvider={dataProvider}>
      <Resource name="posts" list={PostList} />
  </Admin>
);

export default App;