import { Block, Text } from "vcc-ui";

function Shop(props: any) {
  return (
    <div className="Shop">
      <Block extend={{ textAlign: "center" }}>
        <Text variant="hillary" subStyle="emphasis">
          Shop
        </Text>
      </Block>
    </div>
  );
}

export default Shop;
