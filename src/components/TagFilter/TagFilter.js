import { useState } from "react";
import "./TagFilter.css";

// Custom components
import { useAppContext } from "../../App";

const TagFilter = () => {
  const [newTag, setNewTag] = useState("");
  const { tags, setTags } = useAppContext();

  const addTag = (tagToAdd) => {
    setNewTag(tagToAdd);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // clear the form
    document.getElementById("tags_form").reset();

    // Only add tag if not in list.
    // Todo : show a message if already in list
    if (!tags.includes(newTag)) {
      setTags((existingTags) => {
        return [...existingTags, newTag];
      });
    }
  };

  const removeTag = (tagToRemove) => {
    setTags((existingTags) => {
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
      <form onSubmit={handleSubmit} id="tags_form">
        <label
          className="tagFilter__tagLabel secondary-text"
          htmlFor="tag_input"
        >
          Enter a tag to search images:{" "}
        </label>
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

        <button className="tagFilter__button" type="submit" width="auto">
          Add
        </button>
      </form>
      {tags.length ? (
        <p className="secondary-text">Displaying results for tags:-</p>
      ) : null}
      <div className="tagFilter__tags">
        {tags.map((tag) => {
          return tagLabel(tag);
        })}
      </div>
    </div>
  );
};

export default TagFilter;
