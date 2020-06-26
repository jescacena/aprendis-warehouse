var React = require('react');

var {Link} = require('react-router');

var Examples = (props) => {
  return (
    <div>
      <h1 className="text-center">Examples Component</h1>
      <p>Here are a few examples to try out:
        <ol>
          <li>
            <Link to='/?location=Murcia'>Murcia, Spain</Link>
          </li>
          <li>
            <Link to='/?location=Rio'>Rio, Brazil</Link>
          </li>
        </ol>
      </p>
    </div>
  )
};

module.exports = Examples;
