import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import HotTable, { HotColumn } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import { registerLanguageDictionary, esMX } from "handsontable/i18n";
import "handsontable/dist/handsontable.full.css";

// ejecutar para obtener todas lasd las funciones de handsontable

registerAllModules();
registerLanguageDictionary(esMX, "es-MX");

const App = () => {
  const [usuarios, setUsuarios] = useState([]);
  const hotTableComponent = useRef(null);

  useEffect(() => {
    const getData = () => {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((data) => setUsuarios(data));
    };

    getData();
  }, []);

  const descargarArchivo = () => {
    const pluginDescarga =
      hotTableComponent.current.hotInstance.getPlugin("exportFile");
    pluginDescarga.downloadFile("csv", {
      filename: "usuarios",
      fileExtension: "csv",
      MimeTypeArray: "text/csv",
      columnHeaders: true,
    });
  };

  return (
    <div className="App">
      <h1>Table estilo excel</h1>
      <button onClick={() => descargarArchivo()}>Descargar Archivo</button>
      {usuarios && (
        <HotTable
          ref={hotTableComponent}
          language={esMX.languageCode}
          data={usuarios}
          licenseKey="non-commercial-and-evaluation"
          colHeaders={true}
          rowHeaders={true}
          columnSorting={true}
          mergeCells={true}
          contextMenu={["row_above", "row_below"]}
          readOnly={false}
        >
          <HotColumn data="id" title="Identificacion" readOnly={true} />
          <HotColumn data="name" title="Nombre" />
          <HotColumn data="username" title="Usuario" />
          <HotColumn data="email" title="Correo" />
          <HotColumn data="address.street" title="Direccion" />
          <HotColumn data="address.city" title="Ciudad" />
        </HotTable>
      )}
    </div>
  );
};

export default App;
