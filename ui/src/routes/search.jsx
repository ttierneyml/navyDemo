//react imports
import { useContext } from "react"
import { useNavigate } from "react-router-dom"

//MarkLogic imports
import { SearchBox, StringFacet, ResultsConfig, BucketRangeFacet } from "ml-fasttrack"
import { MLContext } from "ml-fasttrack"

//config imports
import searchBoxConfig from "../config/search/SearchBox.config";
import searchResultConfig from "../config/search/ResultsList.config";

//style imports
import { Col, Container, Row} from "react-bootstrap";

export default function Root() {
  const navigate = useNavigate();

  const context = useContext(MLContext);

  const handleSearch = (params) => {
    context.setQtext(params?.q);
    context.setCollections(params?.collections);
  }

  const handleResultClick = (event, snippet) => {
    const newUri = snippet?.uri;
    if (newUri) {
      navigate("/details?uri=" + encodeURIComponent(newUri))
    }
    
  }

  const handleFacetClick = (selection) => {
    context.addStringFacetConstraint(selection)
   }

    return (
      <div id="search">
        <Container fluid className="gap-3">
          <Row>
            <Col>
              <Container className="text-center my-4">
                <SearchBox 
                  menuThemeColor="secondary"
                  buttonThemeColor="secondary"
                  placeholder="Enter query"
                  menuItems={searchBoxConfig.items}
                  onSearch={handleSearch}
                />
              </Container>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
                <Container>
                  <StringFacet title="Model" name="Model" data={context.searchResponse?.facets?.Model} onSelect={handleFacetClick} />
                </Container>
            </Col>
            <Col md={9}>
                <Container>
                    <ResultsConfig
                        results={context.searchResponse.results}
                        onClick={handleResultClick}
                        config={searchResultConfig}
                        paginationFooter={true}
                        paginationHeader={true}
                    />
                </Container>
            </Col>
          </Row>
        </Container>
      </div>
    )
}