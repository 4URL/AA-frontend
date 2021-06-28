import icon from '../views/iconStyles';

export function makeInfowindow(result) {
  var outlineColor;
  if (result.categorySeq == 1 || result.categorySeq == 2) outlineColor = '#1e90ff';
  else if (result.categorySeq == 3 || result.categorySeq == 5) outlineColor = '#ffbc42';
  else if (result.categorySeq == 4 || result.categorySeq == 6) outlineColor = '#79bd5a';
  else outlineColor = '#000000';

  const bMobile = window.innerWidth <= 768;
  const max_width = bMobile ? 150 : 300;
  const headSize = bMobile ? 16 : 19;
  const bodySize = bMobile ? 14 : 16;

  const name = getName(result, headSize, bodySize);
  const description = getDescription(result);
  const convenience = getConvenience(result);
  const homepage = getHomepage(result);
  const mapUrl = getMapUrl(result);

  const newContent = `
        <div class="iw_inner" style="margin: 15px; max-width:${max_width}px; font-family: 'Roboto','Noto Sans KR',AppleSDGothicNeo-Regular,'Malgun Gothic','맑은 고딕',dotum,'돋움',sans-serif;">
            <div style="display: inline-block;">
                ${name}
                ${homepage}
                ${mapUrl}
            </div>
            <p style="font-size: ${bodySize}px">
                ${description}
                <div style="width: ${max_width}px; color:#6e96ff; font-size: ${bodySize}px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;" onclick="event.srcElement.style.whiteSpace = null;">
                    ${convenience}
                </div>
            </p>
        </div>
    `;

  return new naver.maps.InfoWindow({
    content: newContent,
    borderColor: outlineColor,
    borderWidth: 3,
    anchorSkew: true
  });
}

function getName(result, headSize, bodySize) {
  return result.subCategory
    ? `<div class='info'><h3 style="display: inline-block; font-size: ${headSize}px;">${result.name}</h3><p style="display: inline-block; font-size: ${bodySize}px;">&nbsp${result.subCategory}</p></div>`
    : `<h3 style="font-size: ${headSize}px;"><div>${result.name}</div></h3>`;
}

function getDescription(result) {
  return result.description ? `${result.description}<br />` : '';
}

function getConvenience(result) {
  return result.convenience ? result.convenience : '';
}

function getHomepage(result) {
  let imgSrc = `<img src="${icon.homepage_svg}" alt="Homepage" width="25" height="25">`;
  if (result.homepage && result.homepage.search('instagram.com') !== -1) {
    imgSrc = `<svg style="enable-background:new 0 0 512 512; width: 25" version="1.1" viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><style type="text/css">
	.st0{fill:url(#SVGID_1_);}
	.st1{fill:url(#SVGID_2_);}
	.st2{fill:#654C9F;}
</style><g id="Edges"></g><g id="Symbol"><g><radialGradient cx="56.3501" cy="19.2179" gradientTransform="matrix(0.9986 -5.233596e-02 4.448556e-02 0.8488 -36.9742 443.8014)" gradientUnits="userSpaceOnUse" id="SVGID_1_" r="711.335"><stop offset="0" style="stop-color:#FED576"></stop><stop offset="0.2634" style="stop-color:#F47133"></stop><stop offset="0.6091" style="stop-color:#BC3081"></stop><stop offset="1" style="stop-color:#4C63D2"></stop></radialGradient><path class="st0" d="M96.1,23.2c-16.2,6.3-29.9,14.7-43.6,28.4C38.8,65.2,30.4,79,24.1,95.1c-6.1,15.6-10.2,33.5-11.4,59.7    c-1.2,26.2-1.5,34.6-1.5,101.4s0.3,75.2,1.5,101.4c1.2,26.2,5.4,44.1,11.4,59.7c6.3,16.2,14.7,29.9,28.4,43.6    c13.7,13.7,27.4,22.1,43.6,28.4c15.6,6.1,33.5,10.2,59.7,11.4c26.2,1.2,34.6,1.5,101.4,1.5c66.8,0,75.2-0.3,101.4-1.5    c26.2-1.2,44.1-5.4,59.7-11.4c16.2-6.3,29.9-14.7,43.6-28.4c13.7-13.7,22.1-27.4,28.4-43.6c6.1-15.6,10.2-33.5,11.4-59.7    c1.2-26.2,1.5-34.6,1.5-101.4s-0.3-75.2-1.5-101.4c-1.2-26.2-5.4-44.1-11.4-59.7C484,79,475.6,65.2,462,51.6    c-13.7-13.7-27.4-22.1-43.6-28.4c-15.6-6.1-33.5-10.2-59.7-11.4c-26.2-1.2-34.6-1.5-101.4-1.5s-75.2,0.3-101.4,1.5    C129.6,12.9,111.7,17.1,96.1,23.2z M356.6,56c24,1.1,37,5.1,45.7,8.5c11.5,4.5,19.7,9.8,28.3,18.4c8.6,8.6,13.9,16.8,18.4,28.3    c3.4,8.7,7.4,21.7,8.5,45.7c1.2,25.9,1.4,33.7,1.4,99.4s-0.3,73.5-1.4,99.4c-1.1,24-5.1,37-8.5,45.7c-4.5,11.5-9.8,19.7-18.4,28.3    c-8.6,8.6-16.8,13.9-28.3,18.4c-8.7,3.4-21.7,7.4-45.7,8.5c-25.9,1.2-33.7,1.4-99.4,1.4s-73.5-0.3-99.4-1.4    c-24-1.1-37-5.1-45.7-8.5c-11.5-4.5-19.7-9.8-28.3-18.4c-8.6-8.6-13.9-16.8-18.4-28.3c-3.4-8.7-7.4-21.7-8.5-45.7    c-1.2-25.9-1.4-33.7-1.4-99.4s0.3-73.5,1.4-99.4c1.1-24,5.1-37,8.5-45.7c4.5-11.5,9.8-19.7,18.4-28.3c8.6-8.6,16.8-13.9,28.3-18.4    c8.7-3.4,21.7-7.4,45.7-8.5c25.9-1.2,33.7-1.4,99.4-1.4S330.7,54.8,356.6,56z"></path><radialGradient cx="154.0732" cy="134.5501" gradientTransform="matrix(0.9986 -5.233596e-02 4.448556e-02 0.8488 -24.3617 253.2946)" gradientUnits="userSpaceOnUse" id="SVGID_2_" r="365.2801"><stop offset="0" style="stop-color:#FED576"></stop><stop offset="0.2634" style="stop-color:#F47133"></stop><stop offset="0.6091" style="stop-color:#BC3081"></stop><stop offset="1" style="stop-color:#4C63D2"></stop></radialGradient><path class="st1" d="M130.9,256.3c0,69.8,56.6,126.3,126.3,126.3s126.3-56.6,126.3-126.3S327,130,257.2,130    S130.9,186.5,130.9,256.3z M339.2,256.3c0,45.3-36.7,82-82,82s-82-36.7-82-82c0-45.3,36.7-82,82-82S339.2,211,339.2,256.3z"></path><circle class="st2" cx="388.6" cy="125" r="29.5"></circle></g></g></svg>`;
  }

  return result.homepage ? `<a href="${result.homepage}">${imgSrc}</a>` : '';
}

function getMapUrl(result) {
  return result.mapUrl ? `<a href="${result.mapUrl}"><img src="${icon.naver_svg}" alt="Naver Map" width="25" height="25" style="fill: #03c75A;"></a><br/>` : '';
}
