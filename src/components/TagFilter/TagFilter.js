import { useState } from "react";
import "./TagFilter.css";

const TagFilter = () => {
  const [filterTags, setFilterTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const addTag = (tagToAdd) => {
    // check this tag isn't in list. TBD
    setNewTag(tagToAdd);
    // clear the field - TBD
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFilterTags((existingTags) => {
      return [...existingTags, newTag];
    });
  };

  const removeTag = (tagToRemove) => {
    setFilterTags((existingTags) => {
      return existingTags.filter((tag) => tag !== tagToRemove);
    });
  };

  const tagLabel = (tag) => (
    <div className="tagFilter__tag" key={tag}>
      <div className="tagFilter__tagName">{tag}</div>
      <div
        className="tagFilter__tagClose"
        onClick={() => {
          removeTag(tag);
        }}
      >
        &times;
      </div>
    </div>
  );

  return (
    <div className="tagFilter">
      <form onSubmit={handleSubmit}>
        <label htmlFor="tag_input">Enter a tag to search images: </label>
        <input
          type="text"
          id="tag_input"
          name="tag_input"
          placeholder="enter tag.."
          onChange={(event) => {
            addTag(event.target.value);
          }}
          required
          autoComplete="off"
        />

        <button type="submit" width="auto">
          Add
        </button>
      </form>
      <div className="tagFilter__tags">
        {filterTags.map((tag) => {
          return tagLabel(tag);
        })}
      </div>
    </div>
  );
};

export default TagFilter;
