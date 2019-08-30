import React, { Component } from "react";
import "../components/list.css";

class List extends Component {
  state = {
    data: []
  };
  componentDidMount() {
    var temp = [];
    fetch("https://api.spacexdata.com/v3/launches")
      .then(res => res.json())
      .then(data => {
        data.forEach(element => {
          if (element.launch_year > 2014) {
            temp.push(element);
          }
        });
        this.setState({ data: temp });
        this.setListner();
      });
  }

  setListner() {
    var coll = document.getElementsByClassName("showData");
    var i;

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
      });
    }
  }
  render() {
    return (
      <div>
        {this.state.data.map((item, index) => (
          <span key={index}>
            <button className="showData">
              {" "}
              Rocket Name :{item.rocket.rocket_name}, Launch Data:
              {item.launch_date_utc
                .split("T")[0]
                .split("-")
                .reverse()
                .join("-")}
            </button>
            <span className="content">
              <p>
                Flight Number : {item.flight_number} <br />
                Mission Name : {item.mission_name} <br />
                Mission Id : {item.mission_id[0]}
              </p>
            </span>
          </span>
        ))}
      </div>
    );
  }
}

export default List;
