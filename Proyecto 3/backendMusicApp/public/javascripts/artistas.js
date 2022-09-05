document.addEventListener('DOMContentLoaded', () => {
    let json = [
        {
            "id": 1,
            "nombre": "Michael Jackson",
            "foto": "https://i.scdn.co/image/ab6761610000e5eba2a0b9e3448c1e702de9dc90"
        },
        {
            "id": 8,
            "nombre": "Alice In Chains",
            "foto": "https://i.scdn.co/image/ab6761610000e5eb6114a63659d0d5c0a801f733"
        }
    ];

    let json2 = {
        "id": 1,
        "nombre": "Michael Jackson",
        "foto": "https://i.scdn.co/image/ab6761610000e5eba2a0b9e3448c1e702de9dc90",                            
        "albumesDeArtista": [                            
            {
                "id": 1,
                "nombre": "Scream",
                "fecha_publicacion": "2017-09-27",
                "imagen": "https://i.scdn.co/image/ab67616d0000b273cde37cfdee48dc0eae1e2ab8"
            },
        ]
    };

    document.getElementById('artistas').innerHTML = JSON.stringify(json, null, '  ');
    document.getElementById('artista-id').innerHTML = JSON.stringify(json2, null, '  ');
});