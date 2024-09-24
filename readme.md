1. oepn START > `developer command prompt` and go to the project location

1. run the `npm install` command to get all the required dependencies.

1. run `msbuild /t:restore`.

1. Create subfolder `LmvComponentSolution` and go to the foldertControl>cd IncrementControlSolution`

1. run `pac solution init --publisher-name coolOrange --publisher-prefix cO`
   
1. Run `pac solution add-reference --path ..\PowerAppsLmvComponent.pcfproj`
  
1. run `msbuild /t:restore`

1. run `msbuild /t:rebuild /restore /p:Configuration=Release`

1. run `msbuild`

   The generated solution zip file will be available at `IncrementControlSolution\bin\debug` folder.



see https://github.com/microsoft/PowerApps-Samples/blob/master/component-framework/README.md
