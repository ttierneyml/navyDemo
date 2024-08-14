import { useContext, useEffect, useState, useCallback, useMemo } from "react"
import { EntityRecord, MLContext } from "ml-fasttrack"
import { JsonView, WindowCard, NetworkGraph, CategoricalChart } from "ml-fasttrack";

import { sparqlQuery, sparqlToItems, subjectQuery } from "../config/NetworkGraph.config";
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
    const [subject, setSubject] = useState("")
    const [trips, setTrips] = useState([])

    const configMap = {
        weapon: weaponConfig,
        weaponPart: weaponPartConfig,
      }

    const addNodes = (e) => {
        const val = e.label[0].text
        const sub = ""
        trips.forEach((trip) => {
            const obj = decodeURIComponent(trip.o.value)
            if(obj.includes(val)){
                setSubject(trip.o.value)
            }
        })
    }

    useEffect(() => {
        const fetchFocusData = async () => {
            const uri = searchParams.get("uri")
            const doc = await context.getDocument(uri)
            const entityTitle = doc.envelope.instance.info.title
            const id = doc.envelope.instance[entityTitle].id
            const name = doc.envelope.instance[entityTitle].name

            setEntity(entityTitle)
            setFocusData(doc)
            setTitle(name)
            setID(id)

            const config = configMap[entityTitle]
            if (config) {
                setEntityConfig(config)
            }
            const response = await context.postSparql(sparqlQuery(id, encodeURIComponent(name), entityTitle))
            setTrips(response.results.bindings)
        }
        fetchFocusData()
    }, [searchParams])

    useEffect(() => {
        const fetchTrips = async () => {
            const a = trips
            const response = await context.postSparql(subjectQuery(subject))
            console.log(response)
            response.results.bindings.forEach((trip) => {
                a.push(trip)
            })
            setTrips(a)
        }
        fetchTrips()
    }, [subject])

    if (!entity || !focusData || !entityConfig || !title) {
        return <div>Loading...</div>;
    }

    return (
        <div id="document" style={{ height: "100%" }}>
            <Container fluid className="gap-3" style={{ height: "100%" }}>
                <Row>
                    <Col>
                        <Container className="text-center my-4">
                            <h2>{title}/{ID}</h2>
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
                                    items={sparqlToItems(trips, title.concat("/", ID))}
                                    onDoubleClickNode={(event) => addNodes(event)}
                                    showLayout={true}
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