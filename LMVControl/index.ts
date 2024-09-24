import { IInputs, IOutputs } from "./generated/ManifestTypes";


export class LMVControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    
    private _container: HTMLDivElement;

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {
        this._container = container;

        const test = document.createElement('div');
        test.innerHTML = 'Hello World';
        this._container.appendChild(test);

        const viewerDiv = document.createElement('div');
        viewerDiv.id = 'forgeViewer';
        viewerDiv.style.width = '80%';
        viewerDiv.style.height = '80%';
        this._container.appendChild(viewerDiv);
    
        // Dynamically add the Forge Viewer script to the page
        const script = document.createElement('script');
        script.src = 'https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/viewer3D.min.js';
        script.onload = () => {
            // Once script is loaded, initialize the viewer
            this.initializeViewer(viewerDiv);
        };
        script.type = 'text/javascript';
        document.head.appendChild(script);
        
    }

    private initializeViewer(viewerDiv: HTMLDivElement): void {
        const options = {
            //env: 'AutodeskProduction',
            //accessToken: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IlhrUFpfSmhoXzlTYzNZS01oRERBZFBWeFowOF9SUzI1NiIsInBpLmF0bSI6ImFzc2MifQ.eyJzY29wZSI6WyJkYXRhOnJlYWQiXSwiY2xpZW50X2lkIjoiekF5RmtibzBxS2hzbDFWZXg3WVBUakd0YVNMWXVhdFEiLCJpc3MiOiJodHRwczovL2RldmVsb3Blci5hcGkuYXV0b2Rlc2suY29tIiwiYXVkIjoiaHR0cHM6Ly9hdXRvZGVzay5jb20iLCJqdGkiOiJNdHM4QTk0Q2Z1amVDdDlRa1dGTWJGRkhZRUhEZE5LNkY0Vk9JZmNwWUpBaWZKMFN2ZVMyaFBPcnNiNVltRVhkIiwiZXhwIjoxNzI3MTc4MDgwfQ.PWBbEJnesBUsK5ebQMq3zwxszb5Bi_KYx47p3DYQTod17Du_6j5lfhymi7SM5fQuKLlWKlnBVhWtfipsxxg_12dr5PacJzT6ecS4XgleoWEbUG1g20aKLdSNNlOl38OlAZP-WGzt2OT-U0bwSHE2p_8_soqC3dokWadfhJCcT_uPQpQdnFh6HT9pb2WQh-cslNMmUADRr6ZkKWqln3_G5FLDuu94fojtJqK_c51ZsLg4tWUUCZTPl7wAJsgMMvJG3eAPj3fvsS_dbHjstdbxOq0Yc-RSmO-za36EgnIBU2InF4AQbhW5RB7nDmYsVF8XC5jMso4BLIUGf8vxNxWNoQ'
            env: 'Local',
            api: 'streamingV2'
        };
    
        Autodesk.Viewing.Initializer(options, () => {
            const viewer = new Autodesk.Viewing.GuiViewer3D(viewerDiv);
            viewer.start();
    
            const urn = ''; //'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bG12Y2hhdC9DYXJfU2VhdC56aXA';
            // Load the document
            Autodesk.Viewing.Document.load(
                urn,
                (doc) => {
                    const viewables = doc.getRoot().getDefaultGeometry();
                    viewer.loadDocumentNode(doc, viewables);
                },
                (error) => {
                    console.error('Error loading document:', error);
                }
            );
        });
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        // Handle updates if needed
    }

    public getOutputs(): IOutputs {
        return {};
    }

    public destroy(): void {
        // Cleanup when the control is removed
    }
}
