import { useContext, useEffect, useState, useCallback, useMemo } from "react"
import { EntityRecord, MLContext } from "ml-fasttrack"
import { JsonView, WindowCard, NetworkGraph, CategoricalChart } from "ml-fasttrack";

import { sparqlQuery, sparqlToItems } from "../config/NetworkGraph.config";
import { buildQueryForGraph } from "../components/queries.jsx";

import { useSearchParams } from "react-router-dom";
import { Col, Container, Row, Tabs, Tab, Table } from "react-bootstrap";
import "./details.css";
import { weaponConfig, weaponPartConfig } from "../config/EntityRecord.config.js";

export default function Root() {
    const context = useContext(MLContext)
    const [searchParams, setSearchParams] = useSearchParams()
    const [entity, setEntity] = useState("")
    const [focusData, setFocusData] = useState(null)
    // const [windowData, setWindowData] = useState([])
    // const [selectedTaxIDs, setSelectedTaxIDs] = useState([])
    const [entityConfig, setEntityConfig] = useState(null)
    const [title, setTitle] = useState("")
    const [ID, setID] = useState("")

    const configMap = {
        weapon: weaponConfig,
        weaponPart: weaponPartConfig,
      }

    useEffect(() => {
        const fetchFocusData = async () => {
            const uri = searchParams.get("uri")
            const doc = await context.getDocument(uri)
            const entityTitle = doc.envelope.instance.info.title
            const id = doc.envelope.instance[entityTitle].id
            const name = doc.envelope.instance[entityTitle].Name

            setEntity(entityTitle)
            setFocusData(doc)
            setTitle(name)
            setID(id)

            const config = configMap[entityTitle]
            if (config) {
                setEntityConfig(config)
            }
            const trips = await context.getSparql(sparqlQuery(id, encodeURIComponent(name), entityTitle))
        }
        fetchFocusData()
    }, [searchParams])

    if (!entity || !focusData || !entityConfig || !title) {
        return <div>Loading...</div>;
    }

    return (
        <div id="document" style={{ height: "100%" }}>
            <Container fluid className="gap-3" style={{ height: "100%" }}>
                <Row>
                    <Col>
                        <Container className="text-center my-4">
                            <h2>{title}</h2>
                        </Container>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Tabs
                            defaultActiveKey="detailTab"
                            id="document-view"
                            className="mb-3"
                        >
                            <Tab eventKey="detailTab" title="Details">
                                <Row>
                                    <Col md={4}>
                                        <EntityRecord
                                            entity={focusData}
                                            config={configMap[entity]}
                                            multipleValueSeparator={','}
                                        />
                                    </Col>
                                </Row>
                            </Tab>
                            <Tab eventKey="raw" title="Raw">
                                <JsonView
                                    rootName={'instance'}
                                    enableClipboard={false}
                                    displayDataTypes={false}
                                    quotesOnKeys={false}
                                    displayObjectSize={false}
                                    indentWidth={4}
                                    data={focusData}
                                    maxHeight="650px"
                                />
                            </Tab>
                            <Tab eventKey="graphTab" title="Graph" mountOnEnter={true} style={{ height: '100vh', width: "100%" }}>
                                <NetworkGraph
                                    items={sparqlToItems(context.sparqlResponse, title.concat("/", ID))}
                                    // onDoubleClickNode={(event) => openGraphWindow(event)}
                                    showLayout={true}
                                    defaultLayoutValue="sequential"
                                    width={'100%'}
                                />
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}