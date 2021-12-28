import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";

export class App extends React.Component<
  {},
  {
    items: Array<{ id: string; title: string; description: string }>;
    id: string;
    title: string;
    description: string;
    isAddShow: boolean;
    isModify: boolean;
  }
> {
  readonly posts: Array<{ id: string; title: string; description: string }> = [
    {
      id: "1",
      title: "Sample title 1",
      description: "Sample description 1",
    },
    {
      id: "2",
      title: "Sample title 2",
      description: "Sample description 2",
    },
    {
      id: "3",
      title: "Sample title 3",
      description: "Sample description 3",
    },
    {
      id: "4",
      title: "Sample title 4",
      description: "Sample description 4",
    },
    {
      id: "5",
      title: "Sample title 5",
      description: "Sample description 5",
    },
  ];

  constructor(props: any) {
    super(props);
    this.state = {
      items: this.posts,
      id: "",
      title: "",
      description: "",
      isAddShow: false,
      isModify: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addPost = this.addPost.bind(this);
    this.cancelPost = this.cancelPost.bind(this);
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
    var items = this.state.items;
    if (!this.state.isModify) {
      let post: { id: string; title: string; description: string } = {
        id: (this.state.items.length + 1).toString(),
        title: this.state.title,
        description: this.state.description,
      };
      items.push(post);
    } else {
      let post: { id: string; title: string; description: string } = {
        id: this.state.id,
        title: this.state.title,
        description: this.state.description,
      };
      items.splice(+this.state.id - 1, 1, post);
    }

    this.setState({ items: items, isAddShow: false });
    event.preventDefault();
  }

  addPost() {
    this.setState({
      isAddShow: !this.state.isAddShow,
      isModify: false,
      title: "",
      description: "",
    });
  }

  handleItemDelete(i: any) {
    var items = this.state.items;

    items.splice(i, 1);

    this.setState({
      items: items,
    });
  }

  cancelPost() {
    this.setState({ isAddShow: false });
  }

  editPost(i: any) {
    const item = this.state.items[i];
    this.setState({
      isAddShow: true,
      id: item.id,
      title: item.title,
      description: item.description,
      isModify: true,
    });
  }

  render() {
    return (
      <Router>
        <div className="container">
          <div className="row">
            <div className={this.state.isAddShow ? "col-lg-8" : "col-lg-12"}>
              <h3>Posts Lists</h3>
              <div>
                <button className="btn btn-primary" onClick={this.addPost}>
                  Add Post
                </button>
              </div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>{this.renderRows()}</tbody>
              </table>
            </div>
            {this.state.isAddShow ? (
              <div className="col-lg-4">
                {/* <Routes>
              <Route path="/add-post" element={<PostForm />}></Route>
            </Routes> */}
                <div className="container">
                  <div className="row">
                    <h3>{!this.state.isModify ? "Add Post" : "Edit Post"}</h3>
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
                          placeholder="Add title"
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
                          placeholder="Add description"
                        />
                      </label>
                      <br />
                      <br />
                      <input type="submit" value="Submit" />
                      <button onClick={this.cancelPost}>Cancel</button>
                    </form>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </Router>
    );
  }

  renderRows() {
    var context = this;

    return this.state.items.map(function (
      o: { id: string; title: string; description: string },
      i
    ) {
      return (
        <tr key={"item-" + i}>
          <td>{o.id}</td>
          <td>{o.title}</td>
          <td>{o.description}</td>
          <td>
            <button onClick={context.editPost.bind(context, i)}>Edit</button>
            <button onClick={context.handleItemDelete.bind(context, i)}>
              Delete
            </button>
          </td>
        </tr>
      );
    });
  }
}
