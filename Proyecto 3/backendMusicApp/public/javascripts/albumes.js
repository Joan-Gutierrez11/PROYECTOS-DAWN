document.addEventListener('DOMContentLoaded', () => {
    let json = [
        {
            "id": 1,
            "nombre": "Scream",
            "fecha_publicacion": "2017-09-27",
            "imagen": "https://i.scdn.co/image/ab67616d0000b273cde37cfdee48dc0eae1e2ab8"
        },
    ];

    let json2 = {
        "id": 1,
        "nombre": "Scream",
        "fecha_publicacion": "2017-09-27",
        "imagen": "https://i.scdn.co/image/ab67616d0000b273cde37cfdee48dc0eae1e2ab8",                            
        "artistasDelAlbum": [                            
            {
                "id": 1,
                "nombre": "Michael Jackson",
                "foto": "https://i.scdn.co/image/ab6761610000e5eba2a0b9e3448c1e702de9dc90"
            }
        ]
    };

    document.getElementById('albumes').innerHTML = JSON.stringify(json, null, '  ');
    document.getElementById('album-id').innerHTML = JSON.stringify(json2, null, '  ');
});