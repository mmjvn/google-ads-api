import PropTypes from 'prop-types'
import React from 'react'

import AttributesTable from './attributesTable'
import Enums from './enums'

class Attribute extends React.Component {
    constructor(props) {
        super(props)
        this.state = { child_shown: false }
    }

    toggleChild() {
        this.setState(prevState => {
            return { child_shown: !prevState.child_shown }
        })
    }

    render() {
        const { data, name, enums, section } = this.props

        const { _description } = data

        return (
            <div key={`${section}-${name}`} className=" w-100 v-top pb3-5 bt b--opteo-light-gray">
                <div className="pt3-5 mb2">
                    <span className="fw6 mv0 opteo-gray"> {name} </span>{' '}
                    {data._type ? (
                        <span className="f6 fw5 mv0 opteo-middle-gray"> {data._type} </span>
                    ) : (
                        <span className="f6 fw5 mv0 opteo-middle-gray">object</span>
                    )}
                </div>
                {enums ? <Enums enums={enums} /> : null}

                {_description ? (
                    <div className="" dangerouslySetInnerHTML={{ __html: _description }} />
                ) : (
                    <div className="ml3 mt3 pa3 ba b--opteo-light-gray br3">
                        <button
                            className="f6 pa2 ba br2 b--opteo-light-gray opteo-link-blue"
                            onClick={() => {
                                this.toggleChild()
                            }}
                        >
                            {this.state.child_shown ? 'Hide Child Fields' : 'Show Child Fields'}
                        </button>
                        <div style={{ display: this.state.child_shown ? 'block' : 'none' }}>
                            <AttributesTable data={data} section={section} title="Child Attributes" />
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

Attribute.propTypes = {
    data: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    enums: PropTypes.array,
    section: PropTypes.string,
}

export default Attribute
