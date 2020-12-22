import Link from 'next/link';
import Router from 'next/router';
import React, { Component } from 'react';

class mainIndexPage extends Component {
  static async getInitialProps(context) {
    return {
      appName: "Super App"
    };
  }

  render() {
    return (
      <div>
        <h1>{this.props.appName}</h1>
        <h2>The Main Page</h2>
        <p>Go to <Link href="/auth"><a>Auth</a></Link></p>
        <button onClick={() => Router.push('/auth')}>Go to Auth</button>
      </div>
    );
  }
}

export default mainIndexPage