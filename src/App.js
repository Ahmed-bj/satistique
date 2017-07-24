/**
 * Created by SOTUSOFT on 20/07/2017.
 */

import React from 'react';
import { Button,Accordion,Panel,Modal,Input,ButtonToolbar,ButtonInput,ListGroup,ListGroupItem } from 'react-bootstrap';

/*
 const Button = ReactBootstrap.Button,
 Accordion = ReactBootstrap.Accordion,
 Panel = ReactBootstrap.Panel,
 Modal = ReactBootstrap.Modal,
 Input = ReactBootstrap.Input,
 ButtonToolbar = ReactBootstrap.ButtonToolbar,
 ButtonInput = ReactBootstrap.ButtonInput,
 ListGroup = ReactBootstrap.ListGroup,
 ListGroupItem = ReactBootstrap.ListGroupItem
 */


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            showEditModal: false,
            produits: [],
            libelle: "",
            image: {file : "", imagePreviewUrl: ""},
            matierePremiers: "",
            prixs:"",
            editLibelleInputVal: "",
            editImageInputVal: {file : "", imagePreviewUrl: ""},
            editMatierePremiersInputVal: "",
            editPrixsInputVal: "",
            produitToEdit: { libelle: "", image: "", matierePremiers: "",prixs: "" }
        };
    }

    uploadFile(e){
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            let image = {file : file, imagePreviewUrl: reader.result};
            this.setState({ image: image });
        }
        reader.readAsDataURL(file);
    }

    uploadEditFile(e){
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            let image = {file : file, imagePreviewUrl: reader.result};
            this.setState({ editImageInputVal: image });
        }
        reader.readAsDataURL(file);
    }

    componentDidMount() {
        if (localStorage.getItem("produits")) {
            let produits = JSON.parse(localStorage.getItem("produits"));
            this.setState({ produits: produits });
        }
    }

    closeModal() {
        this.setState({ showModal: false });
    }

    openModal() {
        this.setState({ showModal: true });
    }

    closeEditModal() {
        this.setState({ showEditModal: false });
    }

    openEditModal(produit) {
        this.setState({ showEditModal: true, produitToEdit: produit });
    }

    handleLibelleInputChange(e) {
        this.setState({ libelle: e.target.value });
    }

    handleImageInputChange(e) {
        this.uploadFile(e);
        //this.setState({ image: e.target.value });
    }

    handleMatierePremiersInputChange(e) {
        this.setState({ matierePremiers: e.target.value });
    }

    handlePrixsInputChange(e) {
        this.setState({ prixs: e.target.value });
    }

    handleLibelleEditInputChange(value) {
        this.setState({ editLibelleInputVal: value });
    }

    handleImageEditInputChange(e) {
        this.uploadEditFile(e);
        //this.setState({ editImageInputVal: value });
    }

    handleMatierePremiersEditInputChange(value) {
        this.setState({ editMatierePremiersInputVal: value });
    }

    handlePrixsEditInputChange(value) {
        this.setState({ editPrixsInputVal: value });
    }

    handleFormSubmit(event) {
        event.preventDefault();

        let libelle = this.state.libelle,
            image = this.state.image,
            matierePremiers = this.state.matierePremiers,
            prixs = this.state.prixs,
            produits = this.state.produits;
        if (!libelle || !image || !matierePremiers || !prixs) {
            return;
        }

        var string = produits.map((textListe)=>{
            return   textListe.libelle + " , ";
        });
        console.log("etape 1 : produits : " +  string );

        let matiereArr = matierePremiers.split(",");
        produits.push({ libelle: libelle, image: image, matierePremiers: matiereArr, prixs: prixs });

        string = produits.map((textListe)=>{
            return   textListe.libelle + " , ";
        });
        console.log("etape 2 : produits : " +  string );

        this.setState({ produits: produits });
        localStorage.setItem("produits", JSON.stringify(produits));
        this.setState({ libelle: "", matierePremiers: "", prixs: "" });
        this.closeModal();
    }

    handleDeleteProduit(produitIndex, event) {
        event.preventDefault();
        let produits = this.state.produits.filter((produit, index) => {
            return index !== produitIndex;
        });
        this.setState({ produits: produits });
        localStorage.setItem("produits", JSON.stringify(produits));
    }

    handleEditFormSubmit(event) {
        event.preventDefault();
        if (
            this.state.editLibelleInputVal === "" &&
            this.state.editImageInputVal.imagePreviewUrl === "" &&
            this.state.editMatierePremiersInputVal === "" &&
            this.state.editPrixsInputVal === ""
        ) {
            return; // no changes were made
        }
        let produits = this.state.produits;
        produits.map((produit, index) => {
            if (produit.libelle === this.state.produitToEdit.libelle) {
                if (this.state.editLibelleInputVal !== "") {
                    produit.libelle = this.state.editLibelleInputVal;
                }
                if (this.state.editImageInputVal.imagePreviewUrl !== "") {
                    produit.image = this.state.editImageInputVal;
                }
                if (this.state.editMatierePremiersInputVal !== "") {
                    let matiereArr = this.state.editMatierePremiersInputVal.split(",");
                    produit.matierePremiers = matiereArr;
                }
                if (this.state.editPrixsInputVal !== "") {
                    produit.prixs = this.state.editPrixsInputVal;
                }
            }
            return true;
        });
        this.setState({ produits: produits });
        localStorage.setItem("produits", JSON.stringify(produits));
        this.closeEditModal();
    }

    render() {
        return (
            <div className="container">
                <div className="page-header">
                    <h1>Produits</h1>
                </div>
                <div className="row">
                    <div className="col-md-12">

                        <AddProduitForm
                            showModal={this.state.showModal}
                            closeModal={this.closeModal.bind(this)}
                            handleSubmit={this.handleFormSubmit.bind(this)}
                            handleLibelleInputChange={this.handleLibelleInputChange.bind(this)}
                            handleImageInputChange={this.handleImageInputChange.bind(this)}
                            handleMatierePremiersInputChange={this.handleMatierePremiersInputChange.bind(this)}
                            handlePrixsInputChange={this.handlePrixsInputChange.bind(this)}
                        />

                        <EditProduitForm
                            showModal={this.state.showEditModal}
                            closeModal={this.closeEditModal.bind(this)}
                            handleSubmit={this.handleEditFormSubmit.bind(this)}
                            handleLibelleEditInputChange={this.handleLibelleEditInputChange.bind(this)}
                            handleImageEditInputChange={this.handleImageEditInputChange.bind(this)}
                            handleMatierePremiersEditInputChange={this.handleMatierePremiersEditInputChange.bind(this)}
                            handlePrixsEditInputChange={this.handlePrixsEditInputChange.bind(this)}
                            produit={this.state.produitToEdit}
                        />
                        <ProduitList
                            produits={this.state.produits}
                            handleDeleteProduit={this.handleDeleteProduit.bind(this)}
                            handleOpenEditModal={this.openEditModal.bind(this)}
                            editLibelleInputVal={this.state.editLibelleInputVal}
                            editImageInputVal={this.state.editImageInputVal}
                            editMatierePremiersInputVal={this.state.editMatierePremiersInputVal}
                            editPrixsInputVal={this.state.editPrixsInputVal}
                        />

                        <Button
                            bsStyle="primary"
                            bsSize="large"
                            onClick={this.openModal.bind(this)}
                        >
                            Ajouter nouveau produit
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

class ProduitList extends React.Component {
    handleOpenEditModal(produit, event) {
        this.props.handleOpenEditModal(produit);
    }
    render() {
        let produits = this.props.produits.map((produit, index) => {
            var titre = "Produit : " + produit.libelle ;
            return (
                <Panel header={titre} eventKey={index}>
                    <Panel><img src={produit.image.imagePreviewUrl} alt="produit" /> </Panel>
                    <div> Description :  <MatierePremiersList matierePremiers={produit.matierePremiers} /> </div>
                    <br></br>
                    <Panel> Prix : {produit.prixs} </Panel>
                    <ButtonToolbar>
                        <Button
                            bsStyle="danger"
                            onClick={this.props.handleDeleteProduit.bind(null, index)}
                        >
                            Supprimer
                        </Button>
                        <Button
                            bsStyle="primary"
                            onClick={this.handleOpenEditModal.bind(this, produit)}
                        >
                            Modifer
                        </Button>
                    </ButtonToolbar>

                </Panel>
            );
        });
        return (
            <Accordion>
                {produits}
            </Accordion>
        );
    }
}

class MatierePremiersList extends React.Component {
    render() {
        if(!this.props.matierePremiers){
            return(
                <ListGroup>
                    <ListGroupItem></ListGroupItem>
                </ListGroup>
            )
        }
        let matierePremiers = this.props.matierePremiers.map(matiere => {
            return <ListGroupItem>{matiere}</ListGroupItem>;
        });
        return (
            <ListGroup>
                {matierePremiers}
            </ListGroup>
        );
    }
}

class AddProduitForm extends React.Component {
    render() {
        return (
            <Modal show={this.props.showModal} onHide={this.props.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Nouveau produit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.props.handleSubmit}>
                        <Input
                            type="text"
                            label="Libelle"
                            placeholder="(Max 20 caractére)"
                            onChange={this.props.handleLibelleInputChange}
                        />
                        <Input
                            type="textarea"
                            label="description"
                            placeholder="Matiére premiére  ...... etc."
                            onChange={this.props.handleMatierePremiersInputChange}
                        />
                        <Input
                            type="text"
                            label="Prix"
                            placeholder="(number svp)"
                            onChange={this.props.handlePrixsInputChange}
                        />
                        <Input
                            type="file"
                            label="Image"
                            placeholder="format(PNG,JPEG)"
                            onChange={this.props.handleImageInputChange}
                        />
                        <ButtonInput type="submit" value="Ajouter" />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.closeModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

class EditProduitForm extends React.Component {
    handleLibelleEditInputChange(e) {
        this.props.handleLibelleEditInputChange(e.target.value);
    }
    handleImageEditInputChange(e) {
        this.props.handleImageEditInputChange(e);
    }
    handleMatierePremiersEditInputChange(e) {
        this.props.handleMatierePremiersEditInputChange(e.target.value);
    }
    handlePrixsEditInputChange(e) {
        this.props.handlePrixsEditInputChange(e.target.value);
    }
    getFileURL(value){
        if(!value){
            return
        }else{
            return value.imagePreviewUrl;
        }

    }
    render() {
        return (
            <Modal show={this.props.showModal} onHide={this.props.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Modifier le produit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.props.handleSubmit.bind(this)}>
                        <Input
                            type="text"
                            label="Libelle"
                            placeholder="(Max 20 caractére)"
                            defaultValue={this.props.produit.libelle}
                            value={this.props.editLibelleInputVal}
                            onChange={this.handleLibelleEditInputChange.bind(this)}
                        />
                        <Input
                            type="textarea"
                            label="description"
                            placeholder="Matiére premiére  ...... etc."
                            defaultValue={this.props.produit.matierePremiers}
                            value={this.props.editMatierePremiersInputVal}
                            onChange={this.handleMatierePremiersEditInputChange.bind(this)}
                        />
                        <Input
                            type="text"
                            label="Prix"
                            defaultValue={this.props.produit.prixs}
                            value={this.props.editPrixsInputVal}
                            onChange={this.handlePrixsEditInputChange.bind(this)}
                        />
                        <Panel><img src={this.props.produit.image.imagePreviewUrl} alt="produit" /> </Panel>
                        <Input
                            type="file"
                            label="Image"
                            placeholder="format(PNG,JPEG)"
                            value = {this.getFileURL(this.props.editImageInputVal)}
                            onChange={this.handleImageEditInputChange.bind(this)}
                        />

                        <ButtonInput type="submit" value="enregistrer" />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.closeModal}>Fermer</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}


export default App;
