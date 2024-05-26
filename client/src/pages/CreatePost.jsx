import React, { useState } from "react";
import styled from "styled-components";
import GeneratedForm from "../components/GeneratedForm";
import Generatedimage from "../components/Generatedimage";

const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
  background: ${({ theme }) => theme.bg};
  padding: 30px 30px;
  padding-bottom: 50px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  @media (max-width: 800px) {
    padding: 6px 10px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;

  max-width: 1200px;
  gap: 8%;
  display: flex;
  justify-content: center;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const CreatePost = () => {
  const [generateImageloading, setGenImageLoading] = useState(false);
  const [createPostLoading, setCreatePostLoading] = useState(false);
  const [post, setPost] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  return (
    <Container>
      <Wrapper>
        <GeneratedForm
          post={post}
          setPost={setPost}
          createPostLoading={createPostLoading}
          generateImageloading={generateImageloading}
          setCreatePostLoading={setCreatePostLoading}
          setGenImageLoading={setGenImageLoading}
        />
        <Generatedimage src={post?.photo} loading={generateImageloading} />
      </Wrapper>
    </Container>
  );
};

export default CreatePost;
