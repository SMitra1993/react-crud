import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export class PostForm extends React.Component<
  {},
  { title: string; description: string }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      title: "Add a title",
      description: "Add a description",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  onAddPost() {
    const post: any = {
      title: this.state.title,
      description: this.state.description,
    };
  }

  handleInputChange(event: any) {
    const target = event.target;

    switch (target.type) {
      case "text":
        this.setState({
          title: target.value,
        });
        break;
      case "textarea":
        this.setState({
          description: target.value,
        });
        break;
      default:
        break;
    }
  }

  handleSubmit(event: any) {
    alert("An essay was submitted: " + this.state.title);
    alert("An essay was submitted: " + this.state.description);
    event.preventDefault();
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <h3>Posts Lists</h3>
          <form onSubmit={this.handleSubmit}>
            <label>
              Title:
              <br />
              <input
                type="text"
                name="isGoing"
                className="form-control"
                value={this.state.title}
                onChange={this.handleInputChange}
              />
            </label>
            <br />
            <br />
            <label>
              Description:
              <br />
              <textarea
                className="form-control"
                value={this.state.description}
                onChange={this.handleInputChange}
              />
            </label>
            <br />
            <br />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}
