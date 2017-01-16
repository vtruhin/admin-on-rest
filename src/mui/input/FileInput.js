import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import FileField from '../field/FileField';

const defaultStyle = {
    dropZone: {
        background: '#efefef',
        cursor: 'pointer',
        padding: '1rem',
        textAlign: 'center',
        color: '#999',
    },
    previewContainer: {
        position: 'relative',
        display: 'inline-block',
    },
};

class FileInput extends Component {
    constructor(props) {
        super(props);

        let files = props.record[props.source] || [];
        if (!Array.isArray(files)) {
            files = [files];
        }

        this.state = { files };
    }

    onDrop = (files) => {
        const updatedFiles = [
            ...this.state.files,
            ...files.map(f => ({
                title: f.name,
                url: f.preview,
                uploading: true,
            })),
        ];

        this.setState({ files: updatedFiles });
        this.props.input.onChange(files);
    }

    label() {
        if (this.props.multiple) {
            return (
                <p>Drop some files to upload, or click to select one.</p>
            );
        }

        return (
            <p>Drop a file to upload, or click to select it.</p>
        );
    }

    render() {
        const {
            accept,
            disableClick,
            maxSize,
            minSize,
            multiple,
            style,
        } = this.props;

        const finalStyle = {
            ...defaultStyle,
            ...style,
        };

        return (
            <div>
                <Dropzone
                    onDrop={this.onDrop}
                    accept={accept}
                    disableClick={disableClick}
                    maxSize={maxSize}
                    minSize={minSize}
                    multiple={multiple}
                    style={finalStyle.dropZone}
                >
                    {this.label()}
                </Dropzone>
                <div className="previews">
                    {this.state.files.map(f => <FileField key={f.url} file={f} />)}
                </div>
            </div>
        );
    }
}

FileInput.propTypes = {
    accept: PropTypes.string,
    disableClick: PropTypes.bool,
    addLabel: PropTypes.bool,
    input: PropTypes.object,
    maxSize: PropTypes.number,
    minSize: PropTypes.number,
    multiple: PropTypes.bool,
    onUpload: PropTypes.func,
    style: PropTypes.object,
};

FileInput.defaultProps = {
    addLabel: true,
    addField: true,
    multiple: false,
    onUpload: () => {},
};

export default FileInput;
