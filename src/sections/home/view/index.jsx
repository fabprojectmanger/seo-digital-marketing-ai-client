import Wrapper from "../../../components/wrapper/wrapper";
import Welcome from "../Welcome";
import Search from "../Search";
import SearchList from "../SearchSuggestionList";
import Container from "../../../components/container/container";

const Index = () => {
  return (
    <Wrapper className="flex flex-col min-h-[calc(100vh-155px)]">
      <Wrapper className="flex-1 flex items-center justify-center">
        <Welcome />
      </Wrapper>
      <Container>
      <Wrapper className="max-w-[845px] w-full mx-auto mb-[135px]">
      <SearchList />
      <Search />
      </Wrapper></Container>
    </Wrapper>
  );
};

export default Index;
