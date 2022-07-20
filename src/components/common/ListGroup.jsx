import React from "react";

const ListGroup = ({
  items,
  textProperty,
  valueproperty,
  selectedItem,
  onItemSelect,
}) => {
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          style={{ cursor: "pointer" }}
          onClick={() => onItemSelect(item)}
          key={item[valueproperty]}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};
ListGroup.defaultProps = {
  textProperty: "name",
  valueproperty: "_id",
};

export default ListGroup;
